import { Knex } from 'knex';

const superHeroesData = [
    {
        nombre: 'Superman',
        poder: 'Vuelo, Súper Fuerza, Visión de calor',
        fortaleza: 'Sol Amarillo',
        resistencia: 'Extremadamente alta',
        debilidad: 'Kryptonita',
        imagen_url: 'Superman.png'
    },
    {
        nombre: 'Wonder Woman',
        poder: 'Fuerza sobrehumana, Vuelo, Lazo de la Verdad',
        fortaleza: 'Su voluntad y su entrenamiento',
        resistencia: 'Muy alta',
        debilidad: 'Armas punzantes (anteriormente)',
        imagen_url: 'Wonder-Woman.png'
    },
    {
        nombre: 'Batman',
        poder: 'Intelecto de genio, Maestría en combate',
        fortaleza: 'Su preparación y gadgets',
        resistencia: 'Humana máxima',
        debilidad: 'Mortalidad y traumas',
        imagen_url: 'Batman-hd.png'
    },
    {
        nombre: 'Flash (Barry Allen)',
        poder: 'Súper Velocidad, Capacidad de vibrar a través de la materia',
        fortaleza: 'La Speed Force',
        resistencia: 'Acelerada',
        debilidad: 'Frío extremo',
        imagen_url: 'Flash.png'
    },
    {
        nombre: 'Spider-Man (Peter Parker)',
        poder: 'Fuerza y agilidad proporcionales a una araña, Sentido arácnido',
        fortaleza: 'Su sentido arácnido y lanzaredes',
        resistencia: 'Alta',
        debilidad: 'Ciertos sonidos de alta frecuencia',
        imagen_url: 'Spider-Man.png'
    },
    {
        nombre: 'Iron Man (Tony Stark)',
        poder: 'Genio multimillonario, Armadura avanzada',
        fortaleza: 'Su inteligencia y recursos',
        resistencia: 'La de su armadura',
        debilidad: 'Su ego y dependencia de la armadura',
        imagen_url: 'Ironman.png'
    },
    {
        nombre: 'Capitán América (Steve Rogers)',
        poder: 'Fuerza, agilidad y reflejos sobrehumanos gracias al suero del supersoldado',
        fortaleza: 'Su determinación inquebrantable y liderazgo',
        resistencia: 'Resistencia física potenciada y escudo de vibranio',
        debilidad: 'Su idealismo a veces le lleva a conflictos innecesarios',
        imagen_url: 'CapitanAmerica.png'
    },
    {
        nombre: 'Thor Odinson',
        poder: 'Control del trueno y el rayo, fuerza divina, vuelo con Mjolnir',
        fortaleza: 'Su herencia asgardiana le otorga fuerza y durabilidad extremas',
        resistencia: 'Resistencia casi ilimitada como dios del trueno',
        debilidad: 'Su arrogancia y dependencia de Mjolnir al principio',
        imagen_url: 'Thor.png'
    },
    {
        nombre: 'Black Widow (Natasha Romanoff)',
        poder: 'Experta en artes marciales, espionaje y manipulación psicológica',
        fortaleza: 'Su inteligencia emocional y entrenamiento letal',
        resistencia: 'Resistencia humana al límite gracias a su entrenamiento',
        debilidad: 'Su pasado oscuro la atormenta emocionalmente',
        imagen_url: 'BlackWidow.png'
    },
    {
        nombre: 'Doctor Strange (Stephen Strange)',
        poder: 'Magia y manipulación del tiempo con el Ojo de Agamotto',
        fortaleza: 'Su capacidad de aprender y dominar artes místicas',
        resistencia: 'Resistencia mágica y proyección astral',
        debilidad: 'Sus manos dañadas limitan sus gestos mágicos si no usa el artefacto',
        imagen_url: 'DoctorStrange.png'
    }
];

// ----------------------------------------------------
// 2. Funciones de Knex para Seed
// ----------------------------------------------------

/**
* Función que inserta los datos. Es requerida por Knex.
* @param knex Instancia de Knex
*/

export async function seed(knex: Knex): Promise<void> {
    const TABLE_NAME = 'catsuperheroe';
    
    // Borra *TODOS* los registros existentes de la tabla antes de insertar
    await knex(TABLE_NAME).del();

    // Inserta los nuevos datos
    await knex(TABLE_NAME).insert(superHeroesData);
    console.log(` ${superHeroesData.length} Superhéroes insertados en la tabla '${TABLE_NAME}'.`);
}