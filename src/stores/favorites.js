import { defineStore } from "pinia"

export const useFavoritesStore = defineStore({
  id: "favorites",
  state: () => ({
    shoots: [],
  }),
  actions: {
    addShoot(slug, name) {
      this.shoots.push({
        slug: slug,
        name: name,
      })
    },
    removeShoot(slug) {
      this.shoots = this.shoots.filter((shoot) => {
        return shoot.slug !== slug
      })
    },
  },
  persist: true,
})
