import React from 'react';

import NodeElement from './NodeElement';
import Node from '../classes/Node';

class Grid extends React.Component {

	constructor(props) {
		super(props);

		this.start_position = [0, 1];
		this.end_positoin = [0, 1];

		this.epsilon = 0.1;

		this.alpha = 1;
		this.r = -0.04;
		this.r = 0;
		this.gamma = 0.9;

		this.agent_position = [0, 0];
		this.resetAgentPosition();

		this.grid = [
			[new Node(), new Node(), new Node(), new Node('points', 10)],
			[new Node(), new Node(), new Node(), new Node('points', -10)],
			[new Node(), new Node('wall'), new Node(), new Node()],
			[new Node(), new Node(), new Node(), new Node()],
			[new Node(), new Node(), new Node(), new Node()],
			[new Node(), new Node(), new Node(), new Node()],
			[new Node(), new Node(), new Node(), new Node()],
			[new Node(), new Node('wall'), new Node(), new Node()],
			[new Node(), new Node(), new Node(), new Node()],
			[new Node(), new Node(), new Node(), new Node()],
			[new Node(), new Node('wall'), new Node(), new Node()],
			[new Node(), new Node(), new Node(), new Node()],
		];
		this.rows = this.grid.length;
		this.cols = this.grid[0].length;

		this.directions = [
			'north',
			'east',
			'south',
			'west',
		];
	}

	resetAgentPosition() {
		this.agent_position = [11, 0];
	}

	checkIfResetAgent() {
		const current_node = this.getCurrentNode();
		if (current_node.type === 'points') {
			this.resetAgentPosition();
		}
	}

	start() {
		setInterval(() => { this.takeStep() }, 10);
	}

	getCurrentNode() {
		return this.grid[this.agent_position[0]][this.agent_position[1]];
	}

	max(row, col) {
		if (row < 0 || (row > this.rows - 1) || col < 0 || col > (this.cols - 1)) {
			return 0;
		}
		return this.grid[row][col].max();
	}

	getPotentialAgentPosition(direction) {
		switch (direction) {
			case 0:
				return [this.agent_position[0] - 1, this.agent_position[1]];
			case 1:
				return [this.agent_position[0], this.agent_position[1] + 1];
			case 2:
				return [this.agent_position[0] + 1, this.agent_position[1]];
			case 3:
				return [this.agent_position[0], this.agent_position[1] - 1];
			default:
				console.error('unknown direction: ', direction);
				break;
		}
	}

	updateAgentPosition(direction) {
		let agent_row = this.agent_position[0];
		let agent_col = this.agent_position[1];
		switch (direction) {
			case 0:
				agent_row = Math.max(0, this.agent_position[0] - 1);
				break
			case 1:
				agent_col = Math.min((this.cols - 1), this.agent_position[1] + 1);
				break
			case 2:
				agent_row = Math.min((this.rows - 1), this.agent_position[0] + 1);
				break
			case 3:
				agent_col = Math.max(0, this.agent_position[1] - 1);
				break
			default:
				console.error('unknown direction: ', direction);
				break;
		}

		if (this.grid[agent_row][agent_col].type !== 'wall') {
			this.agent_position = [agent_row, agent_col];
		}
	}

	takeStep() {
		let current_node = this.getCurrentNode();
		let highest_direction_index = current_node.getHighestAction();

		// exploration
		if (Math.random() < this.epsilon) {
			highest_direction_index = Math.floor(Math.random() * 4);
		}


		const tmp_potential_agent_position = this.getPotentialAgentPosition(highest_direction_index)
		const max = this.max(...tmp_potential_agent_position);

		// TODO: not happy with this one...
		const total_reward = this.r + (this.gamma * max);

		current_node = this.getCurrentNode()
		if (current_node.type === 'points') {
		}
		current_node.setDirectionPoints(highest_direction_index, total_reward);
		this.updateAgentPosition(highest_direction_index);

		this.checkIfResetAgent();
		this.forceUpdate();
	}

	renderNodes(row, row_index) {
		return row.map((node, col_index) => {
			const active = row_index === this.agent_position[0] && col_index === this.agent_position[1];
			return <NodeElement node={node} key={col_index} active={active} />
		});
	}

	renderGrid() {
		return this.grid.map((row, row_index) => {
			return (
				<div className="row" key={row_index}>
					{this.renderNodes(row, row_index)}
				</div>
			);
		})
	}

	render() {
		return (
			<div>
				<button onClick={this.start.bind(this)}>Start</button>
				<div className="row">
					{this.renderGrid()}
				</div>

			</div>
		);
	}

}

export default Grid;
