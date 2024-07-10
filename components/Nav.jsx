"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from 'react'
import {signIn, signOut, useSesssion, getProviders} from 'next-auth/react'

const Nav = () => {
  const isUserLoggedIn = true

  return (
    <div>
      <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-start">
            <Image
              src="/assets/images/logo.svg"
              alt="Promptopia logo"
              width={30}
              height={30}
              className="object-contain"
            />
            <p className="logo_text">Promptopia</p>
        </Link>

        <div className="sm:flex hidden">
          {isUserLoggedIn ? (
            <div className="flex gap-3 md:gap-5 black_btn">

            </div>
          ):(
            <>

            </>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Nav
