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
                                <v-text-field label = "Имя" v-model="user.first_name" :value="user.first_name" ></v-text-field>    
                            </v-row>
                            <v-row>
                                <v-text-field label = "Фамилия" v-model="user.last_name" :value="user.last_name"></v-text-field>    
                            </v-row>
                            <v-row>
                                <v-text-field label = "Отчество" v-model="user.middle_name" :value="user.middle_name"></v-text-field>    
                            </v-row>
                            <v-row>
                                <v-select 
                                    label = "Роль" 
                                    disabled 
                                    v-model="user.roleId" 
                                    :items="roles" 
                                    item-value="id" 
                                    item-text="name"
                                >
                                </v-select>   
                            </v-row>
                            <v-row>
                                <v-text-field
                                    label="Дата рождения"
                                    v-model="user.date_birth"
                                    :value="user.date_birth.substring(0,10)"
                                    type="date"
                                    mask="YYYY-MM-DD"
                                    @input="SaveNewDateBirth(user.date_birth)"
                                ></v-text-field>
                            </v-row>
                            <v-row> 
                                <v-select label = "Пол"  :items="gender" item-value="id" item-text="name"></v-select>  
                            </v-row>
                            <v-row>
                                <v-text-field label = "Email" v-model="user.email" :value="user.email"></v-text-field>    
                            </v-row>                              
                            <v-divider></v-divider>
                        <v-row>
                            <v-text-field 
                                v-model="user.password" 
                                :value="user.password"
                                label = "Пароль" 
                                :rules="[rules.required, rules.min]"
                                :type="'password'"
                                name="input-10-1"
                                hint="Не 4 символов"
                                counter
                                width = "50%"
                            ></v-text-field>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            class="bg-primary text-secondary"
                            @click="updateUserById(currentUserID, user)"
                        >
                            Сохранить
                        </v-btn>  
                    </v-card-actions>
                    <v-alert v-if="check"
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
import UsersService from '@/services/UsersServices';
export default {
    name: 'ProfileUserPage',
    components: { },
    computed: {
        /*currentUser() {
            return this.$store.state.auth.user;
        }*/},
    data() {
        return {
            currentUserID: 4,
            check:false,
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
            show1: false,
            user: {
                first_name: '',
                last_name: '',
                middle_name: '',
                date_birth: '',
                email: '',
                gender: '',
                roleId: '',
                updatedAt: '',
                createdAt: '',
                password: ''
            },
            rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 4 || 'Min 4 characters',
            emailMatch: () => (`The email and password you entered don't match`),
            avatar: value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
            },
        }
    },
    methods: {
            getUserById(id){
                UsersService.get(id)
                .then (res => {
                    this.user = res.data;
                    if (this.user.roleId === 1) 
                        this.isAdmin = true;
                    console.log(res.data);
                })
                .catch(e => {
                    console.log(e);
                })
            },
            updateUserById(id, data){
                console.log(id)
                console.log(data)
                UsersService.update(id, data)
                .then (res => {
                    this.message = "Данные пользователя успешно обновлены!";
                    this.check = true;
                    console.log(res.data);
                })
                .catch(e => {
                    console.log(e);
                })
            },
            SaveNewDateBirth (date) {
                console.log(date)
            },

    },
    watch: {
        menu (val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        }
    },
    mounted() {
        console.log(this.currentUserID)
        this.getUserById(this.currentUserID); //заменить потом на computed
    }
}
</script>

<style>

</style>