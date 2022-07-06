import type { NextPage, GetStaticPropsContext } from "next";
import { groq } from "next-sanity";

import { urlFor } from "@lib/sanity";
import { getClient } from "@lib/sanity.server";
import { withPageStaticProps } from "@lib/withPageStaticProps";
import Wrapper from "@components/Wrapper";

const teamMateQuery = groq`
  *[_type == "teamMember"] | order(order asc)
{
    name,
    institution,
    bio,
    emails,
    links,
    image
  }`;

const Team: NextPage = ({ teamMembers }) => {
  return (
    <Wrapper>
      <article>
        <h1>Team</h1>
        {teamMembers.length &&
          teamMembers.map((teamMember, index) => (
            <div key={index} tw="mt-10">
              <h2 tw="font-size[var(--step-1)] mb-2">
                {teamMember.name} ({teamMember.institution})
              </h2>
              <div tw="flex items-start">
                {teamMember.image && (
                  <img
                    tw="width[64px] rounded mr-4 object-contain md:(min-width[7rem] width[7rem])"
                    src={urlFor(teamMember.image).url()}
                    alt={`profile photo of ${teamMember.name}`}
                  />
                )}

                <div tw="flex-auto">
                  <p tw="mb-0">
                    {teamMember.bio}
                    <br />
                    {!!teamMember.links?.length &&
                      teamMember.links.map((link, index) => (
                        <a
                          key={index}
                          tw="break-words font-size[var(--step--1)] block"
                          href={`${link}`}
                        >
                          {decodeURI(link)}
                        </a>
                      ))}
                    {!!teamMember.emails?.length &&
                      teamMember.emails.map((email, index) => (
                        <a
                          key={index}
                          tw="break-words font-size[var(--step--1)] block"
                          href={`mailto:${email}`}
                        >
                          {decodeURI(email)}
                        </a>
                      ))}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </article>
    </Wrapper>
  );
};

export const getStaticProps = withPageStaticProps(
  async (context: GetStaticPropsContext, sharedPageStaticProps: unknown) => {
    const teamMembers = await getClient(false).fetch(teamMateQuery);

    return {
      props: {
        ...sharedPageStaticProps.props,
        teamMembers,
      },
      revalidate: 60,
    };
  }
);

export default Team;
