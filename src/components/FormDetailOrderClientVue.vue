<template>
    <div >
        <form @submit.prevent>
            <h1>Информация о заказе</h1>
            <v-text-field></v-text-field>
            <v-select></v-select>
            <v-textarea 
                       placeholder="Название"
                       type="text">
            </v-textarea> 
            <v-row>
                <v-col><my-btn>Отменить</my-btn></v-col>
                <v-col><my-btn>Комментировать</my-btn></v-col>
                <v-col><my-btn>Создать заказ</my-btn></v-col>
                <v-col><my-btn>Сменить статус заказа</my-btn></v-col>
            </v-row>
        </form>
    </div>
</template>
 
 <script>
 export default {
     name: 'my-detail-order-client-form',
     data(){
         return {
        
         }
     },
     methods: {
        
     }
 }
 </script>
 
 <style>
     form {
         display:flex;
         flex-direction: column;
     }
 </style>