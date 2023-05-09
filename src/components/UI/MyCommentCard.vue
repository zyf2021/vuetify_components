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
        <v-list-item-subtitle>Дата создания {{ comment.createdAt.substring(0,10) }}</v-list-item-subtitle>
        <v-list-item-subtitle>Дата изменения {{ comment.updatedAt.substring(0,10) }}</v-list-item-subtitle>
      </v-list-item>
    </v-card-actions>
    <v-card-text class="text-body-1 align-justify py-2">
      {{ comment.text }}
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
    },
    watch: {
      comment(newData) {
            newData.createdAt = newData.createdAt.substring(0,10)
            newData.updatedAt = newData.updatedAt.substring(0,10)
        }
    },
}
</script>

<style>

</style>