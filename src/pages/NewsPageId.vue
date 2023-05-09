<template>
    <v-container
        class="bg-secondary"
    >
        <v-row>
            <v-col 
                cols="12"
                sm="12">
            <my-news-id-card
                :newsId = "news"
                @create="createComment"
            ></my-news-id-card>

            </v-col>

            <v-col 
                cols="12"
                sm="12"
                v-for = "comment in comments"
                :key="comment"
                :value="comment"
            >
                <my-comment-card
                    :comment="comment"
                ></my-comment-card>
            </v-col>
        </v-row>
    </v-container>  
</template>

<script>
//import axios from 'axios'
import NewsService from '@/services/NewsService'
import CommentsService from '@/services/CommentsService'
//import ThemesNewsService from '@/services/ThemesNewsService'
//import FormComment from '@/components/FormComment.vue'

export default {
  //components: {FormComment},
  computed: {
    currentNewsId(){
      return this.$route.params.id;
    }
  },
  data(){
    return {
      dialogVisible: true,
      news: {},
      comments: []
    }
  },
  methods: {
    getOneNewsById(){
      const id = this.$route.params.id
      NewsService.get(id)
      .then((response)=> {
          this.news = response.data
          console.log(this.news)
      })
      .catch((e) => {
          console.log(e)
      })
    },
    getAllComments(){
      const id = this.$route.params.id
      CommentsService.getAll(id)
      .then((response)=> {
          this.comments = response.data
          console.log(this.comments)
      })
      .catch((e) => {
          console.log(e)
      })
    },
    createComment(comment){
      console.log(comment)
      CommentsService.create(comment)
      .then((response)=> {
          this.comments = response.data
          console.log(this.comments)
          this.getAllComments()
      })
      .catch((e) => {
          console.log(e)
      })
      
      //comment.id = this.comments.length
      //this.comments.push(comment)
    },
  },
  watch: {
    comments(newData){
      console.log('NewData', newData)
    }
  },
  mounted() {
    this.getOneNewsById()
    this.getAllComments()
  }

}
</script>

<style>

</style>