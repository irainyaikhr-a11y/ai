import { NextResponse } from 'next/server';
import { getAIResponse } from '../../../../lib/openai';

export async function POST(request) {
    try {
        const { message, history, context } = await request.json();

        if (!message || typeof message !== 'string') {
            return NextResponse.json(
                { error: 'Message is required' },
                { status: 400 }
            );
        }

        // Call the Python AI API
        const aiApiUrl = process.env.NEXT_PUBLIC_AI_API_URL || 'http://localhost:5050';
        const response = await fetch(`${aiApiUrl}/api/ai/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, history, context }),
        });

        if (!response.ok) {
            throw new Error(`AI API responded with status: ${response.status}`);
        }

        const data = await response.json();

        return NextResponse.json({
            response: data.response,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Chat API Error:', error);

        // Return friendly error message
        return NextResponse.json(
            {
                error: 'عذراً، حدث خطأ. حاول مرة أخرى.',
                details: error.message
            },
            { status: 500 }
        );
    }
}
