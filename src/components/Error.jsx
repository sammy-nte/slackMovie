import React from "react"
import { useRouteError } from "react-router-dom"
import NoResultsSvg from "./svgs/NoResultsSvg"

export default function Error() {
    const error = useRouteError()
    
    return (
        <div className="error-page">
        <h1>Error: {error.message}</h1>
        <pre>{error.status} - {error.statusText}</pre>
        <NoResultsSvg />
        </div>
    )
}