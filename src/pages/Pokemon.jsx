
import axios from 'axios'
import { React, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import '../css/pokedetail.css'

export const Pokemon = () => {

  const [pokemon, setPokemon] = useState({
    name: '',
    id: '',
    types: [
      {
        type: {
          name: ''
        }
      }
    ],
    sprites: {
      other: {
        dream_world: {
          front_default: ''
        }
      }
    },
    stats: []
  })

  const { id } = useParams()

  useMemo(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.data)
      .then(setPokemon)
      .catch((error) => console.error(error))

  }, [])

  return (
    <div className='bodydetail'>
      <section className={[pokemon.types[0].type.name, 'imgsection'].join(' ')}>
        <div className='pokeinfo'>
          <div className='pokename'>
            <div>
              <img src="../src/img/TypeIcons/pokebola.png" alt="pokebola" />
              <span className='spanName'>
                {pokemon.name}
              </span>
            </div>
            <span className='pokenumber'>
              #{pokemon.id}
            </span>
          </div>
          <div className="pokedetail">
            <ol className="types">
              {pokemon.types.map((typeSlot, key) => {
                return (
                  <li key={key} className={[typeSlot.type.name, 'type'].join(' ')}>
                    <img src={'../src/img/TypeIcons/Pokemon_Type_Icon_' + typeSlot.type.name + '.png'} alt={typeSlot.type.name} />
                    <span>{typeSlot.type.name}</span>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
        <div>
          <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
        </div>
      </section>
      <section className='contentdetail'>
        <div className='info'>
          <div className='infodiv'>
            <div>
              Tamanho
            </div>
            <span>
              {pokemon.height * 10} (cm)
            </span>
          </div>
          <div className='infodiv'>
            <div>
              Peso
            </div>
            <span>
              {pokemon.weight / 10} (kg)
            </span>
          </div>
        </div>
        <div>
          <ol className='liststats'>
            {pokemon.stats.map((stats, key) => {
              return (
                <li key={key}>
                  <span className="title">{stats.stat.name}</span>
                  <div className="skill-bar">
                    <span className={['skill-per',stats.stat.name].join(' ')} style={{width:`${stats.base_stat}%`}}>
                      <span className='numero'>
                        {stats.base_stat}
                      </span>
                    </span>
                  </div>
                </li>
              )
            }
            )}
          </ol>
        </div>
      </section>
    </div>
  )
}
