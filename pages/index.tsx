import type { NextPage } from 'next'
import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import styles from '../styles/Listing.module.css'
import fs from 'fs';
import Head from 'next/head'

type Props = {
  data: any
}

type Pokemon = {
  id: number
  name: string
  img: string
  width: number
  height: number
}

export async function getStaticProps() {
  const filter = (data:any):Pokemon[] => data.pokemon.map((pokemon:any) => ({
    name: pokemon.name,
    id: pokemon.id,
    img: pokemon.img,
    weight: pokemon.weight,
    height: pokemon.height,
  }));

  const localData = JSON.parse(fs.readFileSync('./public/pokemon-listing.json', 'utf8'));
  const data = filter(localData);

  return {
    props: {
      "data": data,
    },
  };
}

const Listing: NextPage<Props> = ({ data }) => {
  let [sortKey, setSortKey] = useState("");
  let [sortOrder, setSortOrder] = useState("");

  enum Order {
    asc = "asc",
    desc = "desc"
  }

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;

    const newSortKey = target.getAttribute("data-sort-key");
    if (!newSortKey)
      return;

    e.preventDefault();

    const isChangingOrder = newSortKey === sortKey;
    if (isChangingOrder) {
      const newOrder = sortOrder === Order.asc ? Order.desc : Order.asc;
      setSortOrder(newOrder);
    }
    else {
      // Clicking a new column header for the first time
      setSortKey(newSortKey);
      setSortOrder(Order.asc);
    }
  }

  const sortFunction = (a: any, b: any) => {
    const innerSort = (a: any, b: any) => {
      if (sortKey === "name")
        return a[sortKey] < b[sortKey] ? -1 : 1;    // alphabetical
      else {
        const v1 = a[sortKey];      // by numberic value
        const v2 = b[sortKey];

        if (!v1 || !v2)
          return 0;

        // use regexp to remove non-numeric characters
        const v1n = v1.replace(/[^0-9]/g, "");
        const v2n = v2.replace(/[^0-9]/g, "");

        return parseFloat(v1n) < parseFloat(v2n) ? -1 : 1;
      }
    }

    let sortOrderValue = innerSort(a, b);

    if (sortOrder === Order.desc)
      sortOrderValue *= -1;

    return sortOrderValue;
  }

  return (
    <>
      <Head>
        <title>Pokemon Listing</title>
      </Head>

      <h1>Pokemon poke who?</h1>
      <table className={styles.listing}>
        <thead>
          <tr onClick={onClick}>
            <th className="hidden"></th>
            <th className={styles.sort + " " + styles.leftAlign} data-sort-key="name">Name</th>
            <th className={styles.sort} data-sort-key="height">Height</th>
            <th className={styles.sort} data-sort-key="weight">Weight</th>
          </tr>
        </thead>
        <tbody>
          {data && data.sort(sortFunction).map((pokemon: any, index: number) => (
            <tr key={index}>
              <td className={styles.rightAlign}>
                <img loading='lazy' className={styles.thumbnail} src={"./pokemon-images/" + pokemon.img + "-thumbnail.webp"} alt={pokemon.name} />
              </td>
              <td>
                <Link href={`/ImageView/${pokemon.id}`}><a className={styles.link}>{pokemon.name}</a></Link>
              </td>
              <td>{pokemon.height}</td>
              <td>{pokemon.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Listing;
