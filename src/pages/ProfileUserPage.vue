<template>
 <v-container>
        <v-row>
            <v-col cols = "12" sm = "2" md = "4">
                <v-card class="ma-2" flat>
                        <v-img
                            src=""
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="300px"
                        >
                        </v-img>
                        <v-card-actions >
                            <v-file-input
                                class="mr-4"
                                accept="image/png, image/jpeg, image/bmp"
                                placeholder="Pick an avatar"
                                label="Avatar"
                            ></v-file-input>
                        </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols = "12" sm = "10" md = "8">
                <v-card class="ma-2" flat>
                    <v-card-title>
                        <strong> Profile</strong>
                        </v-card-title>
                        <v-card-subtitle><p class="text-justify">Дата последнего изменения</p></v-card-subtitle>
                        <v-card-text>
                            <v-row>
                                <v-text-field label = "Имя"  ></v-text-field>    
                            </v-row>
                            <v-row>
                                <v-text-field label = "Фамилия" ></v-text-field>    
                            </v-row>
                            <v-row>
                                <v-text-field label = "Отчество"></v-text-field>    
                            </v-row>
                            <v-row>
                                <v-select label = "Роль" disabled ></v-select>   
                            </v-row>
                            <v-row>
                                <v-menu
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    transition="scale-transition"
                                    offset-y
                                    width="100%"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        label="Дата рождения"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                        min="1950-01-01"
                                        @change="save"
                                    ></v-date-picker>
                                    </v-menu>
                            </v-row>
                            <v-row> 
                                <v-select label = "Пол"></v-select>  
                            </v-row>
                            <v-row>
                                <v-text-field label = "Номер телефона"></v-text-field>    
                            </v-row>
                            <v-row>
                                <v-text-field label = "Email"></v-text-field>    
                            </v-row>
                            <v-row>
                                <v-text-field label = "Адрес"></v-text-field>    
                            </v-row>                                
                            <v-divider></v-divider>
                        <v-row>
                            <v-text-field 
                                label = "Пароль" 
                                :rules="[rules.required, rules.min]"
                                :type="'password'"
                                name="input-10-1"
                                hint="Не 8 символов"
                                counter
                                @click:append="show1 = !show1"
                                width = "50%"
                            ></v-text-field>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="bg-primary text-secondary"
                        >
                            Сохранить
                        </v-btn>  
                    </v-card-actions>
                    <v-alert v-if="true"
                            dense
                            text
                            type="success"
                            color="info"
                        >
                            Пользователь успешно обновлен!
                    </v-alert>    
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        activePicker: null,
        check:false,
        //date: null,
        menu: false,
        isAdmin:false,
        collections: [],
        gender: [
            {id:"male", name: "мужской"},
            {id:"female", name:"женский"},
        ],
        roles: [
            {id:1, name: "Администратор"},
            {id:2, name:"Библиотекарь"},
            {id:3, name: "Читатель"},
        ],
        message: '',
        tab: null,
        show1: false,
        user: null,
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => (`The email and password you entered don't match`),
          avatar: value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
        },
        watch: {
            menu (val) {
                val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
    }),
}
</script>

<style>

</style>