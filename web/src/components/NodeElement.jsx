import React from 'react';
import classNames from 'classnames';

export default class NodeElement extends React.Component {

	constructor(props) {
		super(props);

		this.node = this.props.node;
	}

	renderNormal() {
		const classes = classNames({
			node: true,
			normal: true,
			active: this.props.active,
		});
		return (
			<div className={classes}>
				{this.node.points[0]}<br />
				{this.node.points[3]} | {this.node.points[1]}<br />
				{this.node.points[2]}<br />
			</div>
		);
	}

	renderWall() {
		return (
			<div className="node wall">
			</div>
		);
	}

	renderPoints() {
		return (
			<div className="node points">
				{this.node.static_points}
			</div>
		);
	}

	render() {
		switch (this.node.type) {
			case 'normal':
				return this.renderNormal();
			case 'wall':
				return this.renderWall();
			case 'points':
				return this.renderPoints();
			default:
				console.error('undefined node type: ', this.node.type);
		}
	}
}
