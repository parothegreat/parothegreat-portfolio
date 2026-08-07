/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/common/libs/prisma';

type Data = {
  status: boolean;
  data?: any;
  error?: any;
};

const isDatabaseConfigured = Boolean(
  process.env.DATABASE_URL &&
    !process.env.DATABASE_URL.includes('USER:PASSWORD@HOST'),
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (!isDatabaseConfigured) {
    return res.status(200).json({ status: true, data: [] });
  }

  try {
    const response = await prisma.projects.findMany();
    res.status(200).json({ status: true, data: response });
  } catch (error) {
    res.status(200).json({ status: false, error: error });
  }
}
