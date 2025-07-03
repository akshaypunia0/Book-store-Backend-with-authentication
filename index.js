import express from 'express'

const app = express()
const port = 5000


app.use(express.json())
app.use(logger);

app.use('/api', authRoutes);
app.use('/api/books', authenticate, bookRoutes);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, () => {
    console.log("server listening perfectly on port no. : ", port);
    
})