module.exports = {
  id: 'feedback-form',
  title: 'Feedback form',
  kind: 'design',
  level: 'organism',
  area: 'confirm',
  situation: 'A person sends feedback about the product from inside it.',
  options: [
    {
      id: 'modal',
      title: 'Send from a Modal',
      useWhen: 'Feedback can be sent from anywhere in the product, such as a help menu.',
      example: 'modal.tsx',
    },
  ],
  do: [
    "Title the Modal 'Send Feedback' and label its action 'Send', after 'Cancel'.",
    'Ask for a category with a `Select` and the feedback with a `Textarea`. Start the category on a safe default.',
    'Name the `Select` with a line of text above it. Select takes no label of its own.',
    "Keep 'Send' `state=\"disabled\"` while the feedback is empty.",
    'Send on Cmd+Enter or Ctrl+Enter from the `Textarea`, through its `onSubmit`. Enter adds a new line.',
    "Show an inline error Alert at the top of the Modal when sending fails, and keep what the person wrote.",
    "Close the Modal when it works, and show a toast: 'Feedback sent.'",
  ],
  dont: [
    'Do not replace the form with a thank-you message that closes on its own.',
    "Do not change the label while it is loading, such as to 'Sending...'.",
    'Do not fail without a word. Say that the feedback was not sent.',
    'Do not clear what the person wrote when sending fails.',
  ],
  notBuiltYet: "Scindo's feedback form labels the Button 'Sending...' while it runs, shows no error when sending fails, and replaces the form with a thank-you that closes after 1.5 seconds. It labels its fields with captions written by hand.",
  seenIn: [
    { product: 'Scindo', path: 'apps/web/src/components/FeedbackWidget.tsx' },
  ],
};
