const rules = {
	size: (v: string) =>
		v.length > 3 ? true : 'O campo deve ter mais de 3 letras',
	isPositive: (v: number) => (v > 0 ? true : 'O campo deve ser maior que zero'),
}

export default rules;