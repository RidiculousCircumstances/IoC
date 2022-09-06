export default class IoC {

	constructor() {
		//resolver определяет, как создавать необходимый инстанс
		this._resolvers = {}; //ключ - токен, значение - сам резолвер
		this._isSingleton = {};
		this._resolvingHandlers = {};
		this._resolvedInstances = {}; //сюда попадают инстансы, которые являются синглтонами
	}

	use(token) {
		if(!this._resolvers[token]) {// порверяем есть ли резолвер, который может создать нужный инстанс
			throw new Error(`Required resolver with token ${token} does not exists`)
		}
		if(this._resolvedInstances[token]) {// проверяем, есть ли экземпляр инстанса в синглтон-пулле
			// console.log('Будет выдан синглтон ' + token)
			return this._resolvedInstances[token];
		}
		let instance = this._resolvers[token](this); //вызываем резолвер по токену. резолверу передан контейнер на всякий случай, 
		//если он потребуется для создания инстанса

		const handlers = this._resolvingHandlers[token] || [];// получаем  по токену хэдлеры.

		for(let handler of handlers) {//вызываем каждый хэндлер, который модифицирует инстанс.
			instance = handler({
				instance,
				ioc: this
			});
		}

		if(this._isSingleton[token]) {
			// console.log('Создан инстанс синглтона ' + token)
			this._resolvedInstances[token] = instance;
		}

		return instance;

	}

	bind(token, resolver) {
		// console.log(`Резолвер ${token} успешно зарегистрирован`)
		this._resolvers[token] = resolver; //инстанс решается путем вызовом некоторого резолвера
	}

	singleton(token, resolver) {
		// console.log(`Резолвер ${token} является синглтоном`)
		this._isSingleton[token] = true;
		this.bind(token, resolver);
	}

	resolving(token, handler) { //метод для регистрации хэндлеров. Когда мы будем создавать новый инстанс, будут вызываться все хэндлеры
		//зарегистрированные под конкретный токен. Изначально его может не существовать.
		// console.log(`Handler для ${token} зарегистрирован!`)
		this._resolvingHandlers[token] = this._resolvingHandlers[token] ? [...this._resolvingHandlers[token], handler] : [handler];
	}

	register(serviceProvider) {
		serviceProvider.register(this); //"мы делегируем ему себя, передавая ему публичные методы контейнера, чтобы он как-то модифицировал нас"
	} 
}

