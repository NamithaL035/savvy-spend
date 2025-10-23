import React from 'react';
import MermaidDiagram from './MermaidDiagram';
import CodeBlock from './CodeBlock';

const capitalizeFirstLetter = (string: string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatKey = (key: string) => {
    return capitalizeFirstLetter(key.replace(/_/g, ' '));
};

const RenderValue: React.FC<{ value: any; isNested?: boolean }> = ({ value, isNested = false }) => {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return (
            <p className={`text-[var(--color-text-secondary)] ${typeof value === 'number' ? 'font-medium text-[var(--color-primary)]' : ''}`}>
                {String(value)}
            </p>
        );
    }

    if (Array.isArray(value)) {
        return (
            <div className="space-y-4">
                {value.map((item, index) => (
                    <div key={index} className="neumorphic-inset p-4 rounded-lg">
                        <RenderValue value={item} isNested={true} />
                    </div>
                ))}
            </div>
        );
    }

    if (typeof value === 'object' && value !== null) {
        return (
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 ${isNested ? '' : 'neumorphic-inset p-6 rounded-xl'}`}>
                {Object.entries(value).map(([key, val]) => (
                    <div key={key}>
                        <h4 className="text-sm font-semibold text-[var(--color-text-secondary)] mb-1">{formatKey(key)}</h4>
                        <RenderValue value={val} isNested={true} />
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const ResultDisplay: React.FC<{ data: any }> = ({ data }) => {
    if (!data) return null;

    // Special handling for grocery list to create a table-like structure
    if (data.items && Array.isArray(data.items)) {
        const currencyFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });

        return (
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="neumorphic-convex p-4 rounded-lg">
                        <p className="text-sm text-[var(--color-primary)] font-semibold">Total Budget</p>
                        <p className="text-2xl font-bold text-[var(--color-text-primary)]">{currencyFormatter.format(data.total_budget)}</p>
                    </div>
                     <div className="neumorphic-convex p-4 rounded-lg">
                        <p className="text-sm text-green-500 font-semibold">Estimated Total</p>
                        <p className="text-2xl font-bold text-[var(--color-text-primary)]">{currencyFormatter.format(data.estimated_total)}</p>
                    </div>
                </div>
                <div className="neumorphic-inset rounded-xl overflow-hidden">
                    <ul className="divide-y divide-[var(--shadow-dark)]">
                        {data.items.map((item: any, index: number) => (
                             <li key={index} className="p-4 flex justify-between items-center transition-all hover:neumorphic-inset">
                                <div>
                                    <p className="font-semibold text-[var(--color-text-primary)]">{item.name}</p>
                                    <p className="text-sm text-[var(--color-text-secondary)]">{item.quantity} • <span className="font-medium">{item.category}</span></p>
                                </div>
                                <p className="font-bold text-lg text-[var(--color-text-primary)]">{currencyFormatter.format(item.approx_cost)}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }


    return (
        <div className="space-y-6">
            {Object.entries(data).map(([key, value]) => (
                <section key={key} className="card !p-0 overflow-hidden">
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] px-6 py-4 border-b border-[var(--shadow-dark)]">
                        {formatKey(key)}
                    </h3>
                    <div className="p-6">
                        {key === 'architecture_diagram' && typeof value === 'string' ? (
                            <MermaidDiagram chart={value} />
                        ) : key === 'one_page_readme' && typeof value === 'string' ? (
                            <CodeBlock content={value} language='markdown' />
                        ) : key === 'data_schema' && typeof value === 'string' ? (
                            <CodeBlock content={value} language='sql' />
                        ) : key === 'sample_synthetic_data' && typeof value === 'object' && value !== null ? (
                             // @ts-ignore
                            <CodeBlock content={value.content} language='json' title={value.filename}/>
                        ) : (
                            <RenderValue value={value} />
                        )}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default ResultDisplay;