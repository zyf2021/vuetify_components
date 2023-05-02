<template>
    <div class="dialog">
    <v-card flat class="dialog__content">
      <v-card-title>{{ title + durations[0].duration}}</v-card-title>
      <form @submit.prevent="submitForm">
        <v-row>
            <v-col
                cols="12"
                sm="6"
            >
                <v-text-field
                    label = "Дата начала действия гарантии" 
                    type="date"
                    mask="YYYY-MM-DD"
                    v-model="date_set"
                    :value="date_set"
                >
                </v-text-field>
                <v-text-field
                    label = "Дата окончания действия гарантии" 
                    type="date"
                    mask="YYYY-MM-DD"
                    v-model="date_close"
                    :value="date_close"
                >
                </v-text-field>        
            </v-col>
            <v-col
                cols="12"
                sm="6"
            >
                <v-select
                    label="Категория гарантии"
                    v-model="select_categories"
                    :items = "categories"
                    item-title="name"
                    item-value="id"
                    return-object
                >
                </v-select>
                <v-select
                    label="Длительность"
                    v-model="select_duration"
                    :items = "durations"
                    item-title="duration"
                    item-value="id"
                    return-object
                ></v-select>
            </v-col>            
        </v-row>
        <v-textarea
            label="Комментарий"
            v-model="comment"
            counter 
            :rules="rules" 
        >
        </v-textarea>
        <v-card-actions>
            <v-btn 
                type="submit"
            >Создать</v-btn>
            <v-btn type="button" @click="$emit('close')">Закрыть</v-btn>
        </v-card-actions>
        </form>
    </v-card>
</div>
  </template>
  
  <script>
  import WarrantysService from '@/services/WarrantysService';
    export default {
      name:'MyDialogWarranty',
      props: {
        title: {
          type: String
        },
        durations: {
          type: Array
        },
        categories: {
          type: Array
        },
      },
      data() {
        return {
          rules: [v => v.length <= 300 || 'Максимальная длина 300 символов'],
          date_set: '',
          date_close: '',
          select_categories: {name:''},
          select_duration: {duration:''},
          comment: ''       
        }
      },
      methods: {
        submitForm() {
          const data = {
            date_set: this.date_set,
            date_close: this.date_close,
            category_id: this.select_categories.id,
            name: this.select_categories.name,
            duration: this.select_duration.duration,
            duration_id: this.select_duration.id,
            comment: this.comment
          }
          WarrantysService.create(data)
          .then((response)=>{
            console.log('Warranty create', response.data)
            this.$emit('updateWarranty', response.data);
          })
          .catch((e) => {
                console.log('Ошибка в диалоговом окне', e)
          })
          
        }
      }
    }
</script>
  
<style scoped>
    .dialog {
        width: 100%;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        display: flex;
        z-index: 9999; 
    }
    .dialog__content {
        margin: auto;
        background: white;
        border-radius: 12px;
        min-height: 50px;
        min-width: 300px;
        padding: 20px;
    }
</style>