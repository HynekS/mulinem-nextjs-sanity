import React, { useState } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { RemoveScroll } from "react-remove-scroll";
import { css } from "@emotion/react";
import tw from "twin.macro";
import { TiSocialFacebook } from "react-icons/ti";

const hamburgerMenuStyles = css`
  width: calc(60px / 2);
  height: calc(45px / 2);
  background-color: transparent;
  border: none;
  position: relative;
  transform: rotate(0deg);
  cursor: pointer;
  z-index: 10;

  & span {
    display: block;
    position: absolute;
    height: calc(6px / 2);
    width: 100%;
    background: currentcolor;
    border-radius: calc(6px / 2);
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
    margin: 0;
    padding: 0;

    &:nth-of-type(1) {
      top: 0px;
    }

    &:nth-of-type(2),
    &:nth-of-type(3) {
      top: calc(18px / 2);
    }

    &:nth-of-type(4) {
      top: calc(36px / 2);
    }
  }

  &.open span {
    &:nth-of-type(1) {
      top: calc(18px / 2);
      width: 0%;
      left: 50%;
    }
    &:nth-of-type(2) {
      transform: rotate(45deg);
    }
    &:nth-of-type(3) {
      transform: rotate(-45deg);
    }
    &:nth-of-type(4) {
      top: calc(18px / 2);
      width: 0%;
      left: 50%;
    }
  }
`;

const StyledNavLink = styled((props) => <Link {...props} />)`
  display: inline-block;
  line-height: 1;
  color: var(--baseTextColor);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 0;
    background: #bbb;
    height: 1px;
    transform: translateY(4px);
    transition: transform 0.3s ease-out;
  }
  &.${(props) => props.activeClassName} {
    color: #bbb;
    cursor: default;
    pointer-events: none;
    &:before {
      background: #bbb;
      transform: translateY(0);
    }
  }
  &:hover {
    text-decoration: none;
  }
  &:hover:before,
  &:focus:before,
  &:active:before {
    transform: translateY(0);
  }
`;

StyledNavLink.defaultProps = {
  activeClassName: "active",
};

export const Navbar = ({ headerData, ...props }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <RemoveScroll enabled={isMenuOpen}>
      <nav tw="fixed inset-0 pointer-events-none h-full md:(flex static items-end relative)">
        <div tw="absolute right-6 top-5 pointer-events-auto md:(hidden)">
          <button
            className={`hamburgerMenu ${isMenuOpen && `open`}`.trim()}
            css={hamburgerMenuStyles}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span />
            <span />
            <span />
            <span />
          </button>
        </div>
        {headerData.items?.length && (
          <ul
            css={[
              tw`pointer-events-auto h-full bg-white transition[transform 0.3s ease] pt-16 items-center md:(flex bg-transparent items-end leading-tight m-0 pt-0)`,
              !isMenuOpen &&
                tw`transform[translateX(-100%)] md:(transform[none])`,
            ]}
          >
            {headerData.items.map((menuItem, index) => (
              <li
                key={index}
                tw="text-2xl list-none mr-5 mt-4 transition[transform 0.3s ease-in-out] md:(font-size[var(--step--1)] mt-0)"
              >
                <Link href={`${menuItem.internalUrl || menuItem.externalUrl}`}>
                  {menuItem.text}
                </Link>
              </li>
            ))}
            <li
              key="fb"
              tw="text-2xl list-none mr-5 mt-4 transition[transform 0.3s ease-in-out] md:(font-size[var(--step--1)] mt-0)"
            >
              <Link
                href="https://cs-cz.facebook.com/Medieval-Urban-Landscape-in-Northeastern-Mesopotamia-Mulinem-476545315816993/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TiSocialFacebook />
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </RemoveScroll>
  );
};

export default Navbar;
