export const BrewInstructions = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
      <h3 className="text-lg font-semibold mb-3 text-center">
        🎯 Comment brasser des potions ?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
            1
          </span>
          <span>Sélectionnez 3 ingrédients disponibles</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
            2
          </span>
          <span>Cliquez sur &quot;Brasser la Potion&quot;</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
            3
          </span>
          <span>Découvrez de nouvelles recettes !</span>
        </div>
      </div>
    </div>
  );
};
