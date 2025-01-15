import {Client as WorkFlowClient} from '@upstash/workflow'
import config from '../config'
import { Client as QstashClient, resend } from "@upstash/qstash";

export const workflowClient = new WorkFlowClient({
  baseUrl: config.env.upstash.qstashurl,
  token: config.env.upstash.qstashtoken!,
});
const qStashClient = new QstashClient({ token: config.env.upstash.qstashtoken! });

export const sendEmail = async({email,subject,message}:EmailProps)=>{
  await qStashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resend.resendToken! }),
    },
    body: {
      from: "Nill White <linuxuser0626@gmail.com>",
      to: [email],
      subject: subject,
      html: message,
    },
  });
}


