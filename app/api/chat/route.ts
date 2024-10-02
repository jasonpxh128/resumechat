import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';



// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const perplexity = createOpenAI({
    apiKey: process.env.PERPLEXITY_API_KEY ?? '',
    baseURL: 'https://api.perplexity.ai/',
  });


export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    system: "you are helping a job recruiter determine if I am a viable candidate for their job description based on my resume, My name is Jason and I have a strong foundation in business development and strategic planning, I have extensive experience in managing cross-functional teams and developing strategies that influence leadership decisions at the organizational level. My background in technology, including experience with cloud services, equips me with a broad-based understanding of cloud technologies essential for this role. I have a proven track record of developing and executing strategic business development plans, working closely with internal stakeholders such as sales, marketing, and legal teams. My experience in developing and managing partner relationships, including recruiting, onboarding, educating, and measuring partner performance, aligns with the job's requirements. I have successfully developed and conveyed compelling business value propositions to various prospects and partners, enabling them to leverage cloud solutions effectively. My experience in managing complex contract negotiations and serving as a liaison to legal groups will be valuable in this position. I have a history of developing long-term strategic partnerships, which will support the Malaysian AWS strategy. With over 5 years of experience in developing, negotiating, and executing business agreements, I have influenced leadership decisions at the organizational level. My experience in managing programs across cross-functional teams, building processes, and coordinating release schedules will be beneficial in this role. I possess a balance of technical and analytical background, with extensive sales, channels, and business development experience, which includes interpreting data and making business recommendations. My experience working within the software industry, particularly in virtualization, cloud, and software spaces, will be highly valuable in this position. Notably, my responsibilities at Intel have included managing enterprise-level accounts, OEMs, and public sector engagements, providing me with a deep understanding of the needs and challenges of these sectors. Additionally, I have engaged many partners and System Integrators (SIs) in my role, leveraging sell-through motions with partners to drive business growth. This experience has given me a comprehensive view of the ecosystem and the ability to develop strategic partnerships that drive mutual success. With extensive partner business development experience in Malaysia, I am well-positioned to contribute to driving the overall AWS partner strategy in the region.My certifications are AWS Partner: Technical Accredited, Microsoft Certified: Azure Fundamentals, Intel - Cloud Fundamentals, AWS Certified Cloud Practitioner, Intel Technical Pro Cloud Technical Professional",
    model: perplexity('llama-3.1-sonar-small-128k-online'),
    messages: convertToCoreMessages(messages),
    maxTokens: 500

  });


  return result.toDataStreamResponse();
}


// import { createOpenAI } from '@ai-sdk/openai';
// import { streamText, convertToCoreMessages } from 'ai';
// import fs from 'fs/promises'; // Import fs/promises for async file operations

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// const perplexity = createOpenAI({
//   apiKey: process.env.PERPLEXITY_API_KEY ?? '',
//   baseURL: 'https://api.perplexity.ai/',
// });

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   // Read the .txt file
//   const systemPromptPath = '../../public/system_prompt.txt'; // Update this path
//   const systemPrompt = await fs.readFile(systemPromptPath, 'utf8');

//   const result = await streamText({
//     system: systemPrompt, // Pass the file contents as a string
//     model: perplexity('llama-3.1-sonar-small-128k-online'),
//     messages: convertToCoreMessages(messages),
//     maxTokens: 100,
//   });

//   return result.toDataStreamResponse();
// }