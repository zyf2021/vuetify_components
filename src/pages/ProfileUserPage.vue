<template>
<v-container>
    <v-row>
            <v-col cols = "12" sm = "12" md = "4">
                <v-card 
                    class="ma-2" 
                    flat
                    height="100%"
                >
                    <v-img v-if="true"
                        :src="avatar_url"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="85%"
                        width="100%"
                    >
                    </v-img>
                    
                    <v-card-actions class="d-flex align-content-start">
                        <v-file-input
                            class="ma-2"
                            show-size="1000"
                            label="ЗАГРУЗКА АВАТАРА"
                            @change="selectFile"
                            variant="outlined"
                        ></v-file-input>
                        <v-btn 
                            class="ma-4 align-self-start"
                            color="accent"
                            variant="flat"
                            theme="dark"
                            @click="uploadImage"
                        >Загрузить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols = "12" sm = "12" md = "8">
                <v-card class="ma-2" flat>
                    <v-card-title>
                        <strong>Профиль пользователя</strong>
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
                                <v-text-field >
                                    {{ selected_role.name }}
                                </v-text-field> 
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

                                <v-select v-if="false">
                                    label="Пол"
                                    v-model="selected_gender"
                                    :items="gender"
                                    item-title="name"
                                    item-value="id"
                                    return-object
                                </v-select>
                                <v-text-field>Мужской</v-text-field>
                            </v-row>
                            <v-row>
                                <v-text-field label = "Email" v-model="user.email" :value="user.email"></v-text-field>    
                            </v-row>  
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
                            <v-divider></v-divider>
                        
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
import FileService from '@/services/FileService';
export default {
    name: 'ProfileUserPage',
    components: { },
    computed: {
        /*currentUser() {
            return this.$store.state.auth.user;
        }*/},
    data() {
        return {
            currentUserID: 7,
            check:false,
            menu: false,
            isAdmin:false,
            collections: [],
            gender: [],
            roles: [
                {id:1, name: "Администратор"},
                {id:2, name:"Менеджер"},
                {id:3, name: "Мастер"},
                {id:4, name: "Клиент"},
            ],
            selected_role: {id:4, name: "Клиент"},
            selected_gender: {},
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
            currentFile: undefined,
            avatar_url: undefined,
        }
    },
    methods:{
            createGenders(){
                this.gender = [
                    {id:"m", name: "мужской"},
                    {id:"f", name:"женский"},
                ]
                console.log(this.gender)
            },
            selectFile(file) {
                //this.progress = 0;
                this.currentFile = file;
                //console.log(this.currentFile)
            },
            uploadImage(){
                if (!this.currentFile) {
                    console.log("Выберите файл!")
                    return;
                }
                console.log(this.currentFile.target.files[0])
                FileService.uploadUserAvatar(this.currentFile.target.files[0], this.currentUserID)
                .then(res => {
                    console.log(res.data)
                    this.currentFile = undefined
                })
                .catch(e => {
                    console.log(e)
                    this.currentFile = undefined
                })
            },

            getUserById(id){
                UsersService.get(id)
                .then (res => {
                    this.user = res.data;
                    if (this.user.roleId === 1) 
                        this.isAdmin = true;
                    
                    console.log(this.user);
                    if (this.user.avatar_url){
                        this.avatar_url = this.user.avatar_url
                    }
                    else {
                        this.avatar_url = "http://localhost:3000/api/files/avatars/empty.jpg"
                    }
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
        },
    },
    mounted() {
        console.log(this.currentUserID)
        this.createGenders()
        this.getUserById(this.currentUserID); //заменить потом на computed
        
    }
}
</script>

<style>

</style>