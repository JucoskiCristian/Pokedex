
import axios from 'axios'
import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../css/pokedetail.css'

export const Pokemon = () => {

  const [pokemon, setPokemon] = useState({
    name : '',
    id : '',
    types:[
      {
        type :{
          name: ''
        }
      }
    ],
    sprites : {
      other :{
        dream_world : {
          front_default :''
        }
      }
    }
  })

  const { id } = useParams()

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.data)
      .then(setPokemon)
      .catch((error) => console.error(error))

  }, [])


  return (
    
    <div className='bodydetail'>
      <section className={[pokemon.types[0].type.name, 'contentdetail'].join(' ')}>
        <div className='pokeinfo'>
          <div className='pokename'>
            <span>
            {pokemon.name}
            </span>
            <span className='pokenumber'>
              #{pokemon.id}
            </span>
          </div>
          <div className="pokedetail">
            <ol className="types">
              {pokemon.types.map((typeSlot, key) => {
                return (
                  <li key={key} className={[typeSlot.type.name, 'type'].join(' ')}>{typeSlot.type.name}</li>
                )
              })}
            </ol>
          </div>
        </div>
        <div>
          <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
        </div>
      </section>
      <section className='resto'>

      </section>
    </div>
  )
}
