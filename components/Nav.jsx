"use client"

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { signIn, signOut, useSession, getProviders  } from 'next-auth/next';
//this will make auth incredibly simple

const Nav = () => {
  return (
      <nav className='flex-between w-full mb-16'>
          <Link href='/' className='flex gap-2 flex-center'>

          </Link>
   </nav>
  )
}

export default Nav; 