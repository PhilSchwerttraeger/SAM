import imgBooks from "../../assets/images/books.jpg"
import imgAudio from "../../assets/images/audio.jpg"
import imgDev from "../../assets/images/dev.jpg"
import imgSounds from "../../assets/images/sounds.jpg"
import imgPlugins from "../../assets/images/plugins.jpg"

const INITIAL_STATE = {
  sections: [
    {
      title: "hats",
      imgUrl: imgBooks,
      id: 1,
      url: "shop/hats",
    },
    {
      title: "jackets",
      imgUrl: imgPlugins,
      id: 2,
      url: "shop/jackets",
    },
    {
      title: "sneakers",
      imgUrl: imgSounds,
      id: 3,
      url: "shop/sneakers",
    },
    {
      title: "womens",
      imgUrl: imgDev,
      id: 4,
      url: "shop/womens",
      size: "large",
    },
    {
      title: "mens",
      imgUrl: imgAudio,
      id: 5,
      url: "shop/mens",
      size: "large",
    },
  ],
}

const directoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default directoryReducer
