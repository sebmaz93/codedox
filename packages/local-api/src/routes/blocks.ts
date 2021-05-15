import express from 'express'
import path from 'path'
import fs from 'fs/promises'

interface Block {
  id: string
  content: string
  type: 'text' | 'code'
}

export const createBlocksRouter = (filename: string, dir: string) => {
  const router = express.Router()
  router.use(express.json())

  const fullPath = path.join(dir, filename)

  router.get('/blocks', async (req, res) => {
    try {
      const file = await fs.readFile(fullPath, {encoding: 'utf-8'})

      res.status(200).send(JSON.parse(file))
    } catch (err) {
      if (err.code === 'ENOENT') {
        await fs.writeFile(fullPath, '[]', 'utf-8')
        res.send([])
      } else {
        throw err
      }
    }
  })

  router.post('/blocks', async (req, res) => {
    const {blocks}: {blocks: Block[]} = req.body

    await fs.writeFile(fullPath, JSON.stringify(blocks), 'utf-8')

    res.status(201).send({status: 'ok'})
  })
  return router
}
