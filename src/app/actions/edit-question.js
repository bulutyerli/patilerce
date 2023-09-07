import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/db-config/db-config';
import User from '@/models/user-model';
import Question from '@/models/questions-model';
import { getServerSession } from 'next-auth/next';

connectDB();
