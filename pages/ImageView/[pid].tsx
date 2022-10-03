import type { NextPage } from 'next';
import styles from '../../styles/ImageView.module.css';
import Image from 'next/image'
import fs from 'fs';
import Head from 'next/head'

type Props = {
    data: any
}

type PokemonImage = {
    id: number
    name: string
    img: string
}

export async function getStaticPaths() {
    const localData = JSON.parse(fs.readFileSync('./public/pokemon-listing.json', 'utf8'));

    const paths = localData.pokemon.map((pokemon: any) => ({
        params: {
            pid: ""+pokemon.id
        },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps(props: any) {
    const pid = props.params.pid;

    const extract = (pokemon: any): PokemonImage => {
        return {
            name: pokemon.name,
            id: pokemon.id,
            img: pokemon.img
        };
    }

    const localData = JSON.parse(fs.readFileSync('./public/pokemon-listing.json', 'utf8'));
    const pokemon = localData.pokemon.find((pokemon: any) => pokemon.id === parseInt(pid));
    const data = extract(pokemon);

    return {
        props: {
            "data": data
        },
    };
}


const ImageView: NextPage<Props> = ({ data }) => {
    return (
        <>
            <Head>
                <title>{data.name}</title>
            </Head>
            <h1 className={styles.name}>{data.name}</h1>
            <div className={styles.imageView}>
                <Image className={styles.image} layout='fill' objectFit='contain' src={"../pokemon-images/" + data.img + ".webp"} alt='Pokemon' />
            </div>
        </>
    );
};

export default ImageView;