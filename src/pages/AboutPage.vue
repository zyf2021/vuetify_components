<template>
  <v-container>
    <v-row
        v-for="color in colors_palete"
        :key="color.color_name"
        :value="color.color_mean"
    >
        <v-col cols="5">
            <v-card
                :color="color.color_mean"
                theme="dark"
                flat
            >
                <v-card-text>
                    <p>{{ color.color_name.toUpperCase() }}</p>
                    <p>{{ color.color_mean.toUpperCase() }}</p>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col cols="5">
            <v-card
                theme="light"
                color="#EFEBE9"
                flat
            >
                <v-card-text
                >
                    {{ color.color_name.toUpperCase() }}
                </v-card-text>
                <v-card-actions>
                    <my-btn>
                        Перейти                      
                    </my-btn>
                </v-card-actions>
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
                {color_name: 'aquamarine', color_mean:'#83E8BA'}
            ]
        }
    }

}
</script>

<style>

</style>