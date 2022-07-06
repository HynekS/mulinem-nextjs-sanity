import Wrapper from "@components/Wrapper";
import Image from "@components/Image";

import type { FooterData } from "@lib/withPageStaticProps";

export const Footer = ({ footerData }: { footerData: FooterData }) => {
  return (
    <footer>
      <Wrapper>
        <div>
          <h3>Supporters</h3>
        </div>
        {!!footerData.length && (
          <ul tw="flex-col md:(flex-row) flex justify-between items-center ml-0 pl-0">
            {footerData.map((supporter) => (
              <li
                tw="md:(mt-0) list-none flex flex[0 1 30%] justify-center mt-8"
                key={supporter.link}
              >
                <a
                  href={supporter.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  tw="flex justify-center"
                >
                  <span tw="sr-only">{supporter.title}</span>
                  {!!supporter.image && (
                    <Image
                      tw="max-width[clamp(160px, 200px, 100%)]"
                      image={supporter.image}
                      alttext={supporter.image.alttext || ""}
                      width={200}
                      widths={[100, 200]}
                      sizes={`(max-width: 320px) 160px, 100%`}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
        <div tw="flex justify-center pb-4 text-sm">
          © 2013–{`${+new Date().getFullYear()}`} MULINEM
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
