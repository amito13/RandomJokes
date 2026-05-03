import React, { useState, useEffect } from 'react'
import './JokeData.css'
//import { fetchRandomJokes } from "../../api/randomUser"
const JokeData = () => {
    const [jokes, setJokes] = useState([])
    const [index, setIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
   // console.log(import.meta.env.VITE_RANDOM_JOKES_API_URL)
    const fetchData = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(import.meta.env.VITE_RANDOM_JOKES_API_URL
)
            
        if (!response.ok) {
            console.log("Status:", response.status)
            throw new Error("API request failed")
            }
            const result = await response.json()
            const data = result?.data?.data || []
            setJokes(data)
            setIndex(0)
        } catch (err) {
            setError('Could not load jokes. Try again.')
            console.error('Error fetching joke:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleNext = () => {
        if (index < jokes.length - 1) {
            setIndex(index + 1)
        } else {
            fetchData()
        }
    }

    const handleCopy = async () => {
        const text = jokes[index]?.content || ''
        try {
            await navigator.clipboard.writeText(text)
        } catch (e) {
            console.error('Copy failed', e)
        }
    }

    const handleShare = () => {
        const text = jokes[index]?.content || ''
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
        window.open(url, '_blank', 'noopener')
    }

    const current = jokes[index] || {}

    return (
        <div className="joke-wrap">
            <div className="joke-card" role="region" aria-live="polite">
                <header className="joke-header">
                    <h1>Daily Laughs</h1>
                    <p className="sub">Quick, clean jokes for a brighter moment.</p>
                </header>

                <main className="joke-main">
                    {loading ? (
                        <div className="loader" />
                    ) : error ? (
                        <div className="joke-error">{error}</div>
                    ) : current.content ? (
                        <>
                            <div className="joke-content">{current.content}</div>
                            {current.author && <div className="joke-author">— {current.author}</div>}
                        </>
                    ) : (
                        <div className="joke-empty">No jokes available.</div>
                    )}
                </main>

                <footer className="joke-footer">
                    <div className="left">
                        <button className="muted" onClick={handleCopy} aria-label="Copy joke">Copy</button>
                        <button className="muted" onClick={handleShare} aria-label="Share joke">Share</button>
                    </div>
                    <div className="right">
                        <button className="primary" onClick={handleNext} aria-label="Next joke">Next</button>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default JokeData
