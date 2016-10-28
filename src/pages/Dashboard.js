import React from 'react'
import SpriteSheet from 'react-spritesheet'


export default class Dashboard extends React.Component {
	render() {
		return (
			<div className="dashboard-wrapper">
				<div className="animate">				
					<SpriteSheet.AnimatedSpriteSheet
						  filename={require("../img/spritesheet.png")}
						  initialFrame={0}
						  frame={{ width: 514, height: 270 }}
						  bounds={{ x: 0, y: 0, width: 26092, height: 270 }}
						  isPlaying
						  loop
						  speed={80}/>
			  	</div>
				<div className="text-animate">
					<p>Das Dashboard wird programmiert und für Sie demnächst freigeschaltet. Falls Sie eine Kennzahl als besonders wichtig erachten oder spezielle Wünsche haben, schicken Sie uns einfach eine E-Mail (Links unten auf den Smiley klicken). Vielen Dank!</p>
				</div>
			</div>
		);
	}
}