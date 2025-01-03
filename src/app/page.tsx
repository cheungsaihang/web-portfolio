import ErrorPage from "@/modules/client/ErrorPage";
import { API_Error, API_Success } from "@/types/api";
import { FS_Article_Home } from "@/types/api/home";
import { isServerBuild } from "@/utils/common";
import { isErrorResponse } from "@/utils/nextResponse";
import { styled, css } from "@pigment-css/react";

const Heading = styled('h2')({
  fontWeight: 'bolder',
  fontSize:'2rem',
  textAlign:'center',
  marginBottom:10,
});

const SubHeading = styled('h3')({
  fontSize:'1.6rem',
  marginTop:20,
});

const PrepareSection = styled('section')(({ theme }) => ({
  marginTop:20,
  backgroundImage:'url(/images/background.jpg)',
  backgroundRepeat:'no-repeat',
  backgroundPositionX:'center',
  backgroundPositionY:'65%',
  backgroundSize:'100%',
  marginLeft:`-${theme.sizes.spacing.mainInner}`,
  marginRight:`-${theme.sizes.spacing.mainInner}`,
  [`@media (max-width: ${theme.media.screenS})`]:{
    backgroundSize:'100% 100%',
    backgroundPositionY:'unset'
  },
  ['div']:{
    padding: `20px 30px`,
    backgroundColor:'rgba(0,0,0,.5)',
    color:theme.colors.background
  }
}));

const JourneySection = styled('section')(({ theme }) => ({
  marginTop:20,
  backgroundColor:theme.vars.colors.journeySection,
  padding:20,
  borderRadius:10,
}));

const Article = styled('article')(({ theme }) => ({
  fontSize:'14px',
  display:'block',
  color: theme.vars.colors.foreground
}));

export default async function Home() {
  const article = await getHomeArticle();

  if(!article){
    return ( <ErrorPage />);
  }

  return (
    <Article>
        <p className={css`padding:0px 20px`}>{article.intro}</p>
        <PrepareSection>
          <div>
            <Heading>{article.preparation.title}</Heading>
            <ul>
              {
                article.preparation.data.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              }
            </ul>
            <br/>
            <p>{article.preparation.note}</p>
          </div>
        </PrepareSection>
        {
          article.journey.map((journey, index) => (
            <JourneySection key={`journey-${index}`}>
              <Heading>{journey.title}</Heading>
              {
                journey.data.map((item, index) => (
                  <div key={`sub-journey-${index}`}>
                    <SubHeading>{item.subTitle}</SubHeading>
                    <p>{item.content}</p>
                  </div>
                ))
              }
            </JourneySection>
          ))
        }
        <br/>
        <p className={css`text-align:center`}>{article.outtro}</p>
    </Article>
  );
}

async function getHomeArticle() {
  //production ssg
  if(isServerBuild()){
    const homeApi = await import("@/libs/firebase/homeApi");
    const article = await homeApi.fetchHomeArticle();
    if(!article){
      throw Error('Build Error - Cannot get home page article');
    }
    return article;
  }
  //development ssr
  const res = await fetch(process.env.API_ENDPOINT  + '/api/home',{ cache: 'no-store' });
  const body = await res.json() as API_Success<FS_Article_Home> | API_Error;
  if(isErrorResponse(body)){
    return null;
  }
  const article = body.result;
  return article;
}

export const dynamic = 'force-static';