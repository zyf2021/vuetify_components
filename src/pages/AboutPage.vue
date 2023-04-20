<template>
  <v-container>
    <v-row>
        <v-col 
            cols="12"
            sm="4"
            v-for="color in colors_palete"
            :key="color.color_name"
            :value="color.color_mean"
        >
            <v-card
                :color="color.color_mean"
                theme="dark"
                flat
            >
                <v-card-text>
                    <p><strong>{{ color.color_name.toUpperCase() }}</strong></p>
                    <p>{{ color.color_mean.toUpperCase() }}</p>
                </v-card-text>
                <v-card-text class="text-primary">
                    <p><strong>{{ color.color_name.toUpperCase() }}</strong></p>
                    <p>{{ color.color_mean.toUpperCase() }}</p>
                </v-card-text>                
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>


<script>
export default {
    name: 'about-page',
    data() {
        return {
            title:'Перейти',
            colors_palete: [
                {color_name: 'khaki', color_mean:'#A49E8D'},
                {color_name: 'brown-lighten-5', color_mean:'#EFEBE9'},
                {color_name: 'taupe', color_mean:'#504136'},
                {color_name: 'cambridge blue', color_mean:'#004D40'},
                {color_name: 'tiffany blue', color_mean:'#E0F2F1'},
                {color_name: 'aquamarine', color_mean:'#83E8BA'},
                {color_name:"Isabelline", color_mean:"#efebe9"},
                {color_name:"Taupe", color_mean:"#504136"},
                {color_name:"Brunswick green", color_mean:"#004d40"},
                {color_name:"Glaucous", color_mean:"#7776bc"},
                {color_name:"YInMn Blue", color_mean:"#3c5483"},
                {color_name:"Prussian blue", color_mean:"#003249"}
            ]
        }
    }

}
</script>

<style>

</style>