<template>
  <v-card
    class="mx-auto"
    flat
    theme="light"
    max-width="100%"
  >
  <v-card-actions>
      <v-list-item class="w-100">
        <template v-slot:prepend>
          <v-avatar
            color="grey-darken-3"
            image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-avatar>
        </template>
        <v-list-item-title>{{ comment.email }}</v-list-item-title>
        <v-list-item-subtitle>18-03-2023</v-list-item-subtitle>
      </v-list-item>
    </v-card-actions>
    <v-card-text class="text-body-1 align-justify py-2">
      {{ comment.body }}
    </v-card-text>

    
  </v-card>
</template>

<script>

export default {
    name:'my-comment-card',
    props:{
        comment:{
            type: Object
        }
    }
}
</script>

<style>

</style>