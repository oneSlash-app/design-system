import Image from "next/image";
import Button from '../components/button/button'

export default function Home() {
  return (
    <div className="flex flex-col p-6">
      <div className="flex flex-row py-2 space-x-4">
        <Button  size='large' type='primary' state='enabled' label='Primary Button' />
        <Button  size='large' type='secondary' state='enabled' label='Secondary Button' />
        <Button  size='large' type='tertiary' state='enabled' label='Tertiary Button' />
        <Button  size='large' type='textOnly' state='enabled' label='Text Only Button' />
      </div>
      <div className="flex flex-row py-2 space-x-4">
        <Button  size='medium' type='primary' state='enabled' label='Primary Button' />
        <Button  size='medium' type='secondary' state='enabled' label='Secondary Button' />
        <Button  size='medium' type='tertiary' state='enabled' label='Tertiary Button' />
        <Button  size='medium' type='textOnly' state='enabled' label='Text Only Button' />
      </div>
      <div className="flex flex-row py-2 space-x-4">
        <Button  size='small' type='primary' state='enabled' label='Primary Button' />
        <Button  size='small' type='secondary' state='enabled' label='Secondary Button' />
        <Button  size='small' type='tertiary' state='enabled' label='Tertiary Button' />
        <Button  size='small' type='textOnly' state='enabled' label='Text Only Button' />
      </div>
    </div>
  );
}
