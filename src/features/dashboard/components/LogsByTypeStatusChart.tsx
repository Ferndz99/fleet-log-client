import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import type { Status2 } from "../types/dashboard";
import { statusLabel } from "#/lib/constants";



interface LogsByTypeStatusChartProps {
    data?: Status2[];
    title?: string;
}

const chartConfig = {
    pending: {
        label: "Pendiente",
        theme: { light: "#f59e0b", dark: "#fbbf24" },
    },
    reviewed: {
        label: "Revisado",
        theme: { light: "#3b82f6", dark: "#60a5fa" },
    },
    resolved: {
        label: "Resuelto",
        theme: { light: "#10b981", dark: "#34d399" },
    },
} satisfies ChartConfig;

function LogsByTypeStatusChart({
    data,
    title = "Registros por tipo y estado",
}: LogsByTypeStatusChartProps) {
    const chartData = data?.map((entry) => ({
        label: statusLabel[entry.label as keyof typeof statusLabel],
        pending: entry.statuses.pending,
        reviewed: entry.statuses.reviewed,
        resolved: entry.statuses.resolved,
    }));

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-75 w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey="pending"
                            stackId="status"
                            fill="var(--color-pending)"
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey="reviewed"
                            stackId="status"
                            fill="var(--color-reviewed)"
                        />
                        <Bar
                            dataKey="resolved"
                            stackId="status"
                            fill="var(--color-resolved)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export default LogsByTypeStatusChart;