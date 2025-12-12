import OpenAI from 'openai'
import db from '../db.js'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key'
})

export function handleChatWebSocket(ws, req) {
  console.log('WebSocket client connected')

  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data.toString())
      
      if (message.type === 'chat') {
        const { conversationId, question, userId } = message

        // Save user message
        db.createChatMessage({
          conversation_id: conversationId,
          role: 'user',
          content: question
        })

        // Stream AI response
        try {
          const stream = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL || 'gpt-4',
            messages: [
              { role: 'system', content: 'You are a helpful AI tutor. Provide clear, educational explanations.' },
              { role: 'user', content: question }
            ],
            stream: true
          })

          let fullResponse = ''

          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || ''
            if (content) {
              fullResponse += content
              ws.send(JSON.stringify({
                type: 'chunk',
                content
              }))
            }
          }

          // Save assistant message
          db.createChatMessage({
            conversation_id: conversationId,
            role: 'assistant',
            content: fullResponse
          })

          ws.send(JSON.stringify({
            type: 'done',
            content: fullResponse
          }))
        } catch (error) {
          console.error('OpenAI error:', error)
          ws.send(JSON.stringify({
            type: 'error',
            message: 'AI service unavailable. Using fallback response.'
          }))
          
          // Fallback response
          const fallback = 'I apologize, but I am currently unable to process your request. Please try again later.'
          ws.send(JSON.stringify({ type: 'chunk', content: fallback }))
          ws.send(JSON.stringify({ type: 'done', content: fallback }))
        }
      }
    } catch (error) {
      console.error('WebSocket error:', error)
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Failed to process message'
      }))
    }
  })

  ws.on('close', () => {
    console.log('WebSocket client disconnected')
  })
}
