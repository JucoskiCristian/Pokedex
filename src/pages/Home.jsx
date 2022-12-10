import React, { useEffect, useState , useMemo } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import ScrollReveal from 'scrollreveal'

import '../css/loading.css'
import '../css/style.css'

export const Pokedex = () => {

  const [pokemons, setPokemons] = useState([])

  const [styleSpinner, setStyleSpinner] = useState({
    display: ''
  })

  const [styleOl, setStyleOl] = useState({
    display: ''
  })

  const pokeApi = {}

  pokeApi.getPokemonsDetail = (pokemon) => {
    return axios.get(pokemon.url)
      .then((response) => response.data)
      .catch((error) => console.error(error))
  }

  useMemo(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')
      .then((response) => response.data.results)
      .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
      .then((detailRequests) => Promise.all(detailRequests))
      .then((pokemonsDetails) => setPokemons(pokemonsDetails))
      .catch((error) => console.error(error))

      console.log('effect axios ')
  },[])

  useEffect(() => {
    setTimeout(() => {
      setStyleSpinner({
        display: 'none'
      })
      setStyleOl({
        display: 'grid'
      })
      ScrollReveal().reveal('.card',{
        delay: 100,
        easing : 'ease-out',
        interval: 100,
        scale: 1.2
      })
    }, 3500);
  }, [])

  return (
    <section className='content'>
      <div className='pokedexLogo'>
        <img src="https://raw.githubusercontent.com/sleduardo20/pokedex/0671af442dff1d8f7141e49eb83b438885bbc9e9/public/img/logo.svg" alt="" />
      </div>
      <div style={styleSpinner} className='spinner' />

      <ol id='pokemonol' style={styleOl} className='pokemons'>
        {pokemons.map((pokemon) => {
          return (
            <Link to={`/pokemon/${pokemon.id}`} className='card'>
              <li key={pokemon.id} className={[pokemon.types[0].type.name, 'pokemon'].join(' ')}>
                <div className='namenumber'>
                  <div className='namediv'>
                    <img src="src\img\TypeIcons\pokebola.png" alt="" />
                    <span>{pokemon.name}</span>
                  </div>
                  <span className='number'>#{pokemon.id}</span>
                </div>
                <div className="detail">
                  <ol className="types">
                    {pokemon.types.map((typeSlot, key) => {
                      return (
                        <li key={key} className={[typeSlot.type.name, 'type'].join(' ')}>
                          <img src={'src/img/TypeIcons/Pokemon_Type_Icon_' + typeSlot.type.name + '.png'} alt={typeSlot.type.name} />
                          <span>{typeSlot.type.name}</span>
                        </li>
                      )
                    })}
                  </ol>
                  <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
                </div>
              </li>
            </Link>
          )
        })}
      </ol>
    </section>
  )
}
