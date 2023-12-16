import { ActionPanel, List, Action, LocalStorage } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { CanvasValues, canvasURL } from "./shared";

export default function Command() {
  const { isLoading, data, revalidate } = usePromise(
    () =>
      LocalStorage.allItems().then((items) =>
        Object.entries(items).map(([name, props]) => [name, JSON.parse(props)]),
      ) as Promise<[string, CanvasValues][]>,
    [],
  );
  return (
    <List isLoading={isLoading}>
      {data &&
        data.map(([name, { id, description }]) => (
          <List.Item
            key={id}
            title={name}
            subtitle={description}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser title="Open in Browser" url={canvasURL(id)} />
                <Action.CopyToClipboard title="Copy Canvas URL" content={canvasURL(id)} />
                <Action
                  title="Delete Canvas"
                  onAction={async () => {
                    await LocalStorage.removeItem(name);
                    revalidate();
                  }}
                />
              </ActionPanel>
            }
          />
        ))}
    </List>
  );
}
