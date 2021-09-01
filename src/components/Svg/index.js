import React from "react";

const Home = (props) => {
  return (
      <svg
          width={20}
          height={17}
          viewBox="0 0 20 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
      >
        <path d="M8 17v-6h4v6h5V9h3L10 0 0 9h3v8h5z" fill="#7B818A" />
      </svg>
  )
}

const BarChart = (props) => {
  return (
      <svg
          width={14}
          height={14}
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
      >
        <path
            d="M0 4.2h3V14H0V4.2zM5.6 0h2.8v14H5.6V0zm5.6 8H14v6h-2.8V8z"
            fill="#7B818A"
        />
      </svg>
  )
}

const Logo = (props) => {
    return (
        <svg
            width={24}
            height={30}
            viewBox="0 0 24 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 3.873c-3.962 0-7.174 3.217-7.174 7.186 0 .874.013 1.241.119 1.652.11.425.347.987.977 2.103.214.38.815 1.125 1.761 2.15a94.739 94.739 0 003.129 3.195 248.307 248.307 0 003.102 2.985l.636.603c.567.536 1.004.95 1.197 1.143.873.875 1.498 1.237 2.236 1.237a2.713 2.713 0 002.711-2.716c0-.57-.173-1.053-.512-1.523a1.658 1.658 0 01.37-2.312 1.651 1.651 0 012.308.37c.7.97 1.14 2.122 1.14 3.465a6.022 6.022 0 01-6.017 6.027c-2.093 0-3.53-1.16-4.574-2.206a78.49 78.49 0 00-1.073-1.025l-.694-.658a251.397 251.397 0 01-3.144-3.025 97.905 97.905 0 01-3.242-3.312c-.918-.995-1.781-2.005-2.212-2.768-.66-1.17-1.077-2.042-1.3-2.905-.223-.867-.223-1.635-.223-2.45v-.03C1.52 5.262 6.212.562 12 .562c5.788 0 10.48 4.7 10.48 10.497a10.47 10.47 0 01-1.556 5.506c-.3.488-.83 1.102-1.346 1.666a60.595 60.595 0 01-1.79 1.857 117.202 117.202 0 01-2.296 2.232l-.012.012-.001.001-1.132-1.206-1.131-1.207.01-.011.036-.033.136-.13a111.118 111.118 0 002.055-2.001 57.094 57.094 0 001.688-1.751c.53-.58.855-.982.97-1.168a7.154 7.154 0 001.063-3.767c0-3.969-3.212-7.186-7.174-7.186zM3.448 19.576c.74.536.906 1.571.37 2.312-.339.47-.512.954-.512 1.523 0 1.5 1.213 2.716 2.71 2.716.721 0 1.407-.373 2.468-1.436l2.338 2.342c-1.187 1.188-2.695 2.405-4.805 2.405A6.022 6.022 0 010 23.412c0-1.343.44-2.495 1.14-3.465a1.651 1.651 0 012.309-.37z"
                fill="#0180FF"
            />
        </svg>
    )
}

const Cross = (props) => {
    return (
        <svg
            width={14}
            height={14}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7 14 1.41z"
                fill="#7B818A"
            />
        </svg>
    )
}

const Arrow = (props) => {
    return (
        <svg
            width={10}
            height={6}
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M.293.293a1 1 0 011.414 0L5 3.586 8.293.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                fill="#6B7280"
            />
        </svg>
    )
}

export {Home, BarChart, Logo, Cross, Arrow}