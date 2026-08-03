import { Tool, TOOL_DOMAIN_LABELS, ToolDomain } from '@/data/tools';

export type ToolDomainFilter = ToolDomain | 'all';

export const filterTools = (
  tools: Tool[],
  domain: ToolDomainFilter,
  query: string,
) => {
  const normalizedQuery = query.trim().toLowerCase();

  return tools.filter((tool) => {
    if (domain !== 'all' && tool.domain !== domain) return false;
    if (!normalizedQuery) return true;

    return [
      tool.name,
      TOOL_DOMAIN_LABELS[tool.domain],
      tool.description,
      ...tool.usedIn,
      ...(tool.related ?? []),
      ...(tool.keywords ?? []),
    ].some((value) => value.toLowerCase().includes(normalizedQuery));
  });
};
