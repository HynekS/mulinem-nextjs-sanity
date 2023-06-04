import type { NextPage, GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import { groq } from "next-sanity";

import { urlFor } from "@lib/sanity";
import { getClient } from "@lib/sanity.server";
import { withPageStaticProps } from "@lib/withPageStaticProps";
import Wrapper from "@components/Wrapper";

import type { TeamMember } from "schema";

type TeamProps = {
  teamMembers: Array<
    Pick<
      TeamMember,
      "name" | "institution" | "bio" | "emails" | "links" | "image"
    >
  >;
};

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

const Team: NextPage<TeamProps> = ({ teamMembers }) => {
  return (
    <>
      <NextSeo title="Our team" />
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
                    <div tw="min-height[133px] flex items-start">
                      <img
                        width="120"
                        height="142"
                        tw="width[64px] rounded mr-4 mt-2 object-contain mb-auto md:(min-width[7rem] width[7rem])"
                        src={urlFor(teamMember.image).url()}
                        alt={`profile photo of ${teamMember.name}`}
                      />
                    </div>
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
    </>
  );
};

export const getStaticProps = withPageStaticProps(
  async (context: GetStaticPropsContext, sharedPageStaticProps) => {
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
