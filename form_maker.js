var form_maker_app = angular.module('FormMakerModule', []);

form_maker_app.controller('FormMakerController', ['$scope', '$http', function($scope, $http, $filter) {
    
    
    
    $scope.languages=[
        {   slug:"ru",  name:"Русский"  },
        {   slug:"en",  name:"English"  },
    ];
    $scope.language_template = function(){
        var output = {};
        for(l=0; l<$scope.languages.length; l++){
            output[$scope.languages[l].slug]="";
        }
        return output;
    }
    
    $scope.interface = {
        title_title:        {ru:"Название формы",                       en:"Form title"},
        cat_title:          {ru:"Категория формы",                      en:"Form category"},
        subcat_title:       {ru:"Подкатегория формы",                   en:"Form subcategory"},
        edit_title:         {ru:"Редактировать",                        en:"Edit"},
        add_field_title:    {ru:"Добавить поле",                        en:"Add field"},
        choose_field_type:  {ru:"Пожалуйста, выберите тип поля",         en:"Choose field type please"},
        undo:               {ru:"Отменить",                             en:"Undo"},
        ok:                 {ru:"Ok",                                   en:"Ok"},
        field_type:         {ru:"Тип поля",                             en:"Field type"},
        add:                {ru:"Добавить",                             en:"Add"},
        
        field_title:        {ru:"Заголовок поля",                           en:"Field title"},
        field_placeholder:  {ru:"Плейсхолдер, что отображать в пустом окне",  en:"Field placeholder"},
        field_options:      {ru:"Варианты поля:",                           en:"Field options"},
        field_checked:      {ru:"Элемент отмечен",                          en:"Field is checked"},
    }
    
    $scope.form_template = {
        cat      :$scope.language_template(),
        subcat  :$scope.language_template(),
        title    :$scope.language_template(),
        fields   :[],
    };
    
    $scope.field_types = [
        "Выберите тип",
        "text",
        "textarea",
        "select",
        "radio",
        "checkbox"
    ];
    
    $scope.do_log = function(){
        console.log($scope.form_template.fields[0].options);
    }
    
    $scope.dialog_language = undefined;
    $scope.add_field = function(dialog_language){
        
        $scope.dialog_language = dialog_language;
        $scope.edit_field_dialog(
            $scope.form_template.fields.push(
                {
                    type:0,
                    title:$scope.language_template(),
                    placeholder:$scope.language_template(),
                    options:[],
                    selected:0,
                    checked:0,
                }
            )-1
        );
    }
    
    $scope.edit_dialog = 0;
    $scope.field_to_edit = undefined;
    
    $scope.edit_field_dialog = function(field_to_edit, dialog_language){
        $scope.field_to_edit = field_to_edit;
        if(dialog_language){ $scope.dialog_language = dialog_language; }
        $scope.edit_dialog=1;
        // $scope.form_template.fields[$scope.field_to_edit].type = 3;

    }
    
    $scope.delete_option = function(what){
        var new_options = [];
        for(i=0; i<$scope.form_template.fields[$scope.field_to_edit].options.length; i++){
            if(i != what){
                new_options.push( $scope.form_template.fields[$scope.field_to_edit].options[i] );
            }
        }
        $scope.form_template.fields[$scope.field_to_edit].options = new_options;
    }
    
    $scope.add_option = function(){
        $scope.form_template.fields[$scope.field_to_edit].options.push( $scope.language_template() );
    }
    
    $scope.close_edit_dialog = function(){
        $scope.edit_dialog = 0;
        $scope.field_to_edit = undefined;
    }
    
    
    $scope.show_loading = 0;
    $scope.save_form_template = function(){
        var output = {};
        for(l = 0; l<$scope.languages.length; l++){
            lo = {};
            ls = $scope.languages[l].slug;
            
            
            lo.category =      $scope.form_template.cat[ls];
            lo.subcategory =   $scope.form_template.subcat[ls];
            lo.name =          $scope.form_template.title[ls];
            lo.fields = [];
            
            for(f=0; f<$scope.form_template.fields.length; f++){
                lo . fields[f]               = {};
                lo . fields[f].type          = $scope.form_template.fields[f].type;
                lo . fields[f].title         = $scope.form_template.fields[f].title[ls];
                lo . fields[f].placeholder   = $scope.form_template.fields[f].placeholder[ls];
                lo . fields[f].selected      = $scope.form_template.fields[f].selected;
                lo . fields[f].checked       = $scope.form_template.fields[f].checked;
                lo . fields[f].options       = [];

                for(o=0; o<$scope.form_template.fields[f].options.length; o++){
                    lo.fields[f].options[o] = $scope.form_template.fields[f].options[o][ls];
                };
            }
            
            output[ls] = lo;
            
        }
        
        
        
        
        $scope.show_loading = 1;
        
        
        return $http.post(
            'save_form_template.php',
            {"form_template":output}
        ).then(function(data, status, headers, config) {
            if(data.status === "ok") {
				
            } else {
                // alert("Template is not saved")
                console.log(data);
            }
			$scope.show_loading = 0;
        });
        
        
    }
    
}]);

























