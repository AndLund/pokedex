import React from "react";
import "./App.css";
// import { type } from "os";

class App extends React.Component {
	//variável que quando alterada provoca uma alteração no metodo render
	state = {
		pokemon: {},
		numPokemon: 1
	};

	//Quando carregar o componente vai usar esse metodo
	componentDidMount() {
		this.getPokemon(1);
	}

	getPokemon = async n => {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
		const pokemon = await response.json();
		const { name, types, height, weight, sprites } = pokemon;
		const response2 = await fetch(
			`https://pokeapi.co/api/v2/pokemon-species/${n}`
		);
		const descricao = await response2.json();
		const { flavor_text_entries } = descricao;
		const poke = {
			name,
			types,
			height,
			weight,
			sprites,
			description: flavor_text_entries[1].flavor_text
		};
		this.setState({ pokemon: poke });
		//console.log(poke);
	};

	alteraPokemon = anteriorProximo => {
		let { numPokemon } = this.state;
		if (anteriorProximo > 0) numPokemon = numPokemon + 1;
		else {
			if (numPokemon > 1) numPokemon = numPokemon - 1;
		}
		this.getPokemon(numPokemon);
		this.setState({ numPokemon });
	};

	render() {
		const { pokemon, numPokemon } = this.state;
		return (
			<div className="container">
				<div className="navbar navbar-light">POKEDEX</div>
				<div className="botoes">
					<button
						className="btn btn-warning"
						onClick={() => this.alteraPokemon(0)}
					>
						&larr; #{numPokemon - 1}(Anterior)
					</button>
					<button
						className="btn btn-success"
						onClick={() => this.alteraPokemon(1)}
					>
						#{numPokemon + 1} (Próximo) &rarr;
					</button>
				</div>
				<div className="card">
					<div className="fundoImagem">
						{pokemon.name && (
							<img
								className="card-img-top"
								src={pokemon.sprites.front_default}
								alt="Card image"
							/>
						)}
					</div>
					<div className="card-body">
						<h4 className="card-title">
							<b>#{numPokemon} -&nbsp;</b>
							<strong id="primeiraLetra">{pokemon.name}</strong>
						</h4>
						<p className="card-text">
							<p className="descricion">
								<b>Descrição:</b>
								<br />
								{pokemon.description}
							</p>
							<p className="separar">
								<b>Peso:</b>
								{pokemon.weight / 10}kg&nbsp;&nbsp;
								<b>Altura:</b>
								{pokemon.height / 10}m
							</p>
							<p>
								<b>
									Tipo(s):{" "}
									{pokemon.types &&
										pokemon.types.map(tipo => `${tipo.type.name} `)}
								</b>
							</p>
						</p>
					</div>
				</div>
				<footer className="page-footer font-small">
					<div className="footer-copyright text-center py-3 rodape">
						Desenvolvido por Anderson
					</div>
				</footer>
			</div>
		);
	}
}

export default App;
