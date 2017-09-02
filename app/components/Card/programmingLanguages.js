// A map of programming languages (with color) that are actively developed on GitHub.

const programmingLanguagesMap = new Map([
  ['Go', '#375eab'],
  ['TypeScript', '#2b7489'],
  ['Rust', '#dea584'],
  ['Java', '#b07219'],
  ['CoffeeScript', '#244776'],
  ['Ruby', '#701516'],
  ['C', '#555555'],
  ['C++', '#f34b7d'],
  ['C#', '#178600'],
  ['Python', '#3572A5'],
  ['Elixir', '#6e4a7e'],
  ['Julia', '#a270ba'],
  ['Scala', '#c22d40'],
  ['Erlang', '#B83998'],
  ['Haskell', '#5e5086'],
  ['Objective-C', '#438eff'],
  ['Dart', '#00B4AB'],
  ['OCaml', '#3be133'],
  ['F#', '#b845fc'],
  ['JavaScript', '#f1e05a'],
  ['HTML', '#e34c26'],
  ['CSS', '#563d7c']
]);

const programmingLanguages = new Proxy(programmingLanguagesMap, {
  get: (target, id) => {
    return target.has(id) ? target.get(id) : '#000'; // set default value  
  },
});

export default programmingLanguages;
