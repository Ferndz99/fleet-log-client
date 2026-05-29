import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";

function KpiCard() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Ventas</CardTitle>
			</CardHeader>

			<CardContent>
				<div className="text-2xl font-bold">$2.350.000</div>
				<p className="text-muted-foreground text-sm">
					+12% respecto al mes pasado
				</p>
			</CardContent>
		</Card>
	);
}

export default KpiCard;
