import React from "react"

const Img = (props) => (
    <div className="imgg">
        <img
            onClick={() => {
                props.imageClick(props.img)
                props.background()
                props.settingClick()
            }}
            src={props.url}
            alt="Unsplash"
        />
    </div>
)

export default Img
